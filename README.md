# TooGoodToBeASurprise
"Build what you like and what interests you," they said. So I built this full-stack app inspired by an app I really enjoy, and speaks to my interests (food) and values (environmental concerns and waste reduction).

ToGoodToGo is an app aimed at reducing food waste by creating a new market for food vendors who would otherwise throw out their product. Think of bakery day-olds, bagels in the evening, even berries at the close of a farmer's market, or the staples like mashed potatoes or beans and rice a restaurant may have at the end of the night. 

Traditionally, these things have gone in the trash because it made no sense to keep them. People usually want them fresh. 

This app lets people know when food vendors have such excess, and lets people buy it at a significant discount, but without fully identifying what they're selling before hand, in a "surprise bag."

It doesn't always work as intended though. Some vendors put poor products in the bag, or the bag doesn't reach the promised three times the retail value. I thought it would be fun to track what vendors offer what, and sort them by neighborhood or city when people wanted to explore.

I had started with a similar format, but back then I wanted to document my favorite foods around the world. I didn't think a site like that had the potential of regular visits though, so my mind went to the TooGoodToGo app, which is full of similar food discoveries, but would be used more frequently. It was also building off another site, so I could borrow their design sensibilities. So many other sites look like they're built by coders and not designers.

The navigation is created with an intent to offer value to regular users. The category of "Nabe" will allow you to target places to try rin your neighborhood. The categort of city is if you want to explore a new neighborhood and go farther afield. That's how I would use this app anyway. Reddit has a TGTG group that already has such information, but it's also cluttered with comments and you have to drill down for info most relevant to you. This is my attempt at improving on that.

## How It's Made
Node.js, Express, CSS, JavaScript, MongoDB, EJS.

## Special Features

The use of the header to contain the nav bar when logged in, and to hold Login/Sign In options when not is a feature I really enjoyed figuring out and building. It's less complicated than I first thought.

## Optimizations

The likes are not attached to user_id and just increment. I've hidden that feature for now.

I would like to make location changeable.

Once I got the likes right, I could use the data to make a favorites list.

Comments are also in (and hidden). I would like to tie them to user identity.

There are minor issues with the form. The date is required, but I don't have a default for it nor does it throw an error. Similarly, with the image uploader, `.gif`s just crash the system. I need to exclude and throw and error.

## Lessons Learned

* The form for entering data can be pushed to a modal, but the modal is best done client-side. It's cumbersome on the server side. 

* There were times when a call for user info in the logged-in header went unanswered and crashed the app. That's because the main page didn't pull it in as part of the render.

For example, `user: req.user` needed to be added to the render here, even though `feed.ejs` doesn't use it - but the header does.

```
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  ```

* In order to have a readable date, without using moment.js, I used `post.Date.toDateString();` ... However the `toDateString` method fails if there is no date. So I need to require a date.

* I learned to use two databases, pulling from one to get info from another.

In my `post` controller, I had it using values from the `post` schema to push to the `post` view. I wanted the `post` view to show the name of the creator, but `post` controller only got the `user.id` from the `post` schema.

So I had to: `const User = require("../models/User");` in the controller.
Then I used `findbyId` and `user.id` from the `post` schema to define the `user` document of `user.id` by writing `const userfile = await User.findById({ _id: req.user.id })`

Then I was able to create the field in the `post` controller:
```
await Post.create({
        Author: userfile.userName,
```

Finally I had to alter the `post` schema to record `Author`:

```
const PostSchema = new mongoose.Schema({
  Author: {
    type: String,
    require: true,
  },
```
