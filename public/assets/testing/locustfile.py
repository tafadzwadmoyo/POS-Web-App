from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()

    def login(self):
        self.client.post("/#!/login", {"username":"test@test.test", "password":"testing123"})

    @task(2)
    def index(self):
        self.client.get("/#!")

    @task(1)
    def profile(self):
        self.client.get("/#!/stock")

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000