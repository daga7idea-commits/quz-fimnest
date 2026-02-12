
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Telegram Config
const TELEGRAM_BOT_TOKEN = '7404336134:AAFesJRaS4LGvp3lOWFUdcD5NLcwpfKD0Gc';
const TELEGRAM_CHAT_ID = '-4517974340';

app.post('/api/submit', async (req, res) => {
  const { name, status, contact } = req.body;

  const text = `✨ عميلة جديدة ✨\n\n👤 الاسم: ${name}\n💍 الحالة: ${status}\n📱 التواصل: ${contact}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text
      })
    });

    if (response.ok) {
      res.status(200).json({ success: true, message: 'Data sent to Telegram' });
    } else {
      res.status(500).json({ success: false, message: 'Telegram API error' });
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
