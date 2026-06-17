# Boost your app's performance using threads

## Elevator pitch

Do you have multiple repeating tasks in your code? Do you have performance issues on your website? Or do you have a long-running task that’s holding up the rest of your request? Then threading might be the solution!

## Description

First, I’ll provide a quick overview of the situations in which you might want to use threads. The talk will then cover all the different features available for using threads and asynchronous code execution in CFML. I will discuss implicit threading provided by many built-in functions as well as explicit threading via <cfthread> / thread and futures created via runAsync(). Furthermore, I’ll explain what task threads are and how they differ from regular threads. Though threading also has some caveats, which you’ll learn about, as well.


## Notes

I’ve recently managed to boost the speed of some of our pages by around 200% using threading. Though the topic is complex and there are different approaches and features. And threading can also be a bit complicated. So I thought it might be a great topic to cover in a talk.

I’ll focus on functionality in Lucee, as that’s the engine I’m used to. Though I’ll try to check out the possibilities in Adobe CF to reach a broad audience.
