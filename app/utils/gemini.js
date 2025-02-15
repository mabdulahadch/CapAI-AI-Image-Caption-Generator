const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  // responseMimeType: 'application/json',
};

async function generateImageCaption(base64Image) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage([
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image, // Use `inlineData` for base64-encoded images
        },
      },
      {
        // text: 'I am uploading an image. Your task is to generate the most suitable, engaging, and genuine caption for it. The caption should be creative, thought-provoking, and relevant to the content of the image, avoiding generic descriptions. Ensure to add that the caption is concise yet impactful, aligning with the emotions or themes conveyed by the image. \nDo not generate an image description—focus on crafting an authentic and meaningful caption that would be used for social media, marketing, or storytelling purposes in JSON format.',
      text: "I am uploading an image. Your task is to generate the most suitable, engaging, and genuine caption for it. The caption should be creative, thought-provoking, and relevant to the content of the image, avoiding generic descriptions. Ensure that the caption is concise yet impactful, aligning with the emotions or themes conveyed by the image. Do not generate an image description—focus solely on crafting an authentic and meaningful caption that would be used for social media, marketing, or storytelling purposes. Return the output in JSON format with only the 'caption' and 'style' fields. Example format:{  'captions': [    {      'caption': 'Your creative caption here.',   'style': 'Tone or mood of the caption (e.g., Playful, Sophisticated, Bold, etc.)' } ] }" },
    ]);

    return result.response.text();
  } catch (error) {
    console.error('Error generating caption:', error);
    throw error;
  }
}
export default generateImageCaption; // Export as default

// {
//   role: 'user',
//   parts: [
//     {
//       fileData: {
//         mimeType: 'image/jpeg',
//         data: require('../../assets/images/image1.jpg'),
//       },
//     },
//     {
//       text: 'I am uploading an image. Your task is to generate the most suitable, engaging, and genuine caption for it. The caption should be creative, thought-provoking, and relevant to the content of the image, avoiding generic descriptions. Additionally, provide a brief historical or cultural context if applicable. Ensure that the caption is concise yet impactful, aligning with the emotions or themes conveyed by the image. \nDo not generate an image description—focus on crafting an authentic and meaningful caption that would be used for social media, marketing, or storytelling purposes.',
//     },
//   ],
// },
// {
//   role: 'model',
//   parts: [
//     {
//       text: 'Here are a few caption ideas for the image, considering its composition, color palette, and overall mood:\n\n1.  **"Painted skies meet tranquil waters. A pause at the edge of the world, where colors whisper stories of twilight\'s embrace."** (Evokes a sense of wonder and peaceful contemplation)\n\n2.  **"The dock is calling, and I must go. Towards sunsets that bleed across the sky, reflecting dreams upon the water\'s skin."** (Inspired by the John Muir quote, adds a personal, adventurous feel)\n\n3.  **"A symphony of blue and rose. This isn\'t just a sunset; it\'s a moment suspended in time, a canvas splashed with the day\'s last breath."** (Uses evocative language to emphasize the artistry of nature)\n\n4.  **"Step onto the path of twilight, where the day\'s hustle fades into the calm embrace of the evening. Let the water carry away your worries."** (A more direct, invitational caption promoting relaxation)\n\n5.  **"In the quiet hush between day and night, the world paints its most breathtaking masterpiece."** (Short, poetic, and universally appealing)\n\n**Historical/Cultural Context (If Applicable):**\n\nIf the location is known (e.g., a specific lake in a region known for its sunsets), you could add a line about local lore or the region\'s artistic history inspired by such scenes. For instance, "For centuries, artists have sought inspiration from these [Lake Name] sunsets, capturing the ephemeral beauty of the changing light."\n\nChoose the caption that you feel best resonates with the image\'s essence and your desired tone.',
//     },
//   ],
// },
