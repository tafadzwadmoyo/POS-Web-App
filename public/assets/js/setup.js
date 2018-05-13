var pages = [{ target: "home", url: "assets/html/home.html", content: "Home" },
    { target: "chat", url: "assets/html/chat.html", content: "Chat" },
    { target: "sell", url: "assets/html/sell.html", content: "Sell" },
    { target: "stock", url: "assets/html/stock.html", content: "Stock" },
    { target: "refund", url: "assets/html/refund.html", content: "Refund" },
    { target: "sales", url: "assets/html/sales.html", content: "Sales Report" },
    { target: "balance", url: "assets/html/balance.html", content: "Balance Inquiry" },
    { target: "discount", url: "assets/html/discount.html", content: "Discount" },
    { target: "settings", url: "assets/html/settings.html", content: "Settings" },
    { target: "feedback", url: "assets/html/feedback.html", content: "Send Feedback" },
    { target: "help", url: "assets/html/help.html", content: "Help" },
];
var products = {};
var productsJSON = {};
/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js', {
            scope: '/'
        }).then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service worker registration failed, error:', error);
        });
}*/