import { openai } from '../../config/openaiConfig';

const handler = async (req, res) => {
	switch (req.method) {
		case 'POST':
			await generateImage(req, res);
			break;
	}
};

const generateImage = async (req, res) => {
  const { prompt, size } = req.body

  const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

	try {
		const response = await openai.createImage({
			prompt,
			n: 1,
			size: imageSize
		});

		const imageUrl = response.data.data[0].url;

		res.status(200).json({ success: true, imageUrl });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export default handler;
