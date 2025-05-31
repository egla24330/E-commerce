import ContactMessage from '../models/contactModel.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'All fields required' });

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};


export const deleteContacts = async (req, res) => {

  try {
    const messages = await ContactMessage.findByIdAndDelete(req.params.id)
    res.json({ messages })

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};