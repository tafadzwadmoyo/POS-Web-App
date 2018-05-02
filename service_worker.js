cacheName = "version1"
    /*self.addEventListener('install', function(event) {
        event.waitUntil(
            caches.open(cacheName).then(function(cache) {
                return cache.addAll(
                    [
                        "index.html",
                        "assets/html/balance.html",
                        "assets/html/chat.html",
                        "assets/html/chat_conversation.html",
                        "assets/html/chat_conversation_item.html",
                        "assets/html/chat_message_box.html",
                        "assets/html/discount.html",
                        "assets/html/feedback.html",
                        "assets/html/help.html",
                        "assets/html/home.html",
                        "assets/html/item.html",
                        "assets/html/login.html",
                        "assets/html/menu_item.html",
                        "assets/html/message_box.html",
                        "assets/html/payment.html",
                        "assets/html/payment_thank_you.html",
                        "assets/html/product.html",
                        "assets/html/refund.html",
                        "assets/html/sales.html",
                        "assets/html/sell.html",
                        "assets/html/settings.html",
                        "assets/html/stock.html"
                    ]
                );
            })
        );
    });

    self.addEventListener('activate', function(event) {
        // Perform some task
    });

    /*self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    });*/