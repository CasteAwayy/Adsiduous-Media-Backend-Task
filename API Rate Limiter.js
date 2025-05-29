class RateLimiter {
  // static map to store information of all user with user_id , request count and current_time
  static info = new Map(null);

  //contructor method to initialize limit and sliding window time in sec
  constructor(limit, window) {
    this.limit = limit;
    this.window = window;
  }

  //method to check whether to allow request or not, returns true if allowed otherwise false
  allowRequest(user_id, current_time) {
    if (!RateLimiter.info.has(user_id)) {
      RateLimiter.info.set(user_id, {
        count: 1,
        initTime: current_time,
      });
    } else {
      const diff_time = current_time - RateLimiter.info.get(user_id).initTime;
      RateLimiter.info.set(user_id, {
        ...RateLimiter.info.get(user_id),
        count:
          diff_time <= this.window
            ? RateLimiter.info.get(user_id).count + 1
            : 1,
        initTime:
          diff_time > this.window
            ? current_time
            : RateLimiter.info.get(user_id).initTime,
      });
    }
    console.log(
      RateLimiter.info.get(user_id).count <= this.limit ? true : false
    );
  }
}

// example input
const rl = new RateLimiter(3, 60);
rl.allowRequest("user1", 1);
rl.allowRequest("user1", 20);
rl.allowRequest("user1", 30);
rl.allowRequest("user1", 40);

//  example output
//   true
//   true
//   true
//   false
