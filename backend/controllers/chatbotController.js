import fetch from 'node-fetch';

const chatbotController = async (req, res) => {

    const {userMessage } = req.body;
     console.log('req hit the server')

    try {
         const platformInfo = `
You are a helpful assistant for YegnaCart, an Ethiopian-based e-commerce platform. YegnaCart connects local sellers and buyers through a secure, reliable, and user-friendly shopping experience.
📦 Users can buy electronics, fashion, home decor, construction materials, books, automotive parts, beauty products, and more.
💳 After checkout, users upload bank receipts to verify payments. If a product is not yet verified, the assistant should show a warning icon and guide users to click "Verify" at the top right to upload their receipt.
💸 NetMarket System: Users registered under someone can earn coins when they buy goods. 1 coin = 0.25 ETB. To request withdrawals: click the profile icon → My Profile → Withdrawal Request → Fill in coin amount, Account Holder Name, Phone Number, and Bank Account Number  and minimum Withdrawal coin is 999 coins.
🛠️ Built & Maintained by Datora — a digital studio founded by Abdi Gemechu and Betel Syoum. Our mission is to empower local businesses through modern digital commerce. We value innovation, impact, and quality engineering.
Keep responses friendly, simple, and helpful.
`;
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://your-domain.com",
                "X-Title": "YegnaCart Chatbot"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-0528:free",
                messages: [
                    { role: "user", content: `${platformInfo}\nUser: ${userMessage}` }
                ]
            })
        });
        
        const data = await response.json();
        res.json({ message: data });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Chatbot service error', details: error.message });
    }
    res.json({ message: 'Chatbot response placeholder' });
}

export default chatbotController