# **Urban Life Optimizer**
nwHacks 2026 Project
Authors: Mu Ye, Sakura, Natalie, Annaliese

## **Inspiration**

People living in cities are getting increasingly burnt out by obligations such as work and commuting. Moving closer to work might seem nice, but often comes with a higher cost of living. The Urban Life Optimizer aims to help guide users by suggesting a balanced lifestyle that is both mentally and financially sustainable.

## **What it does**

Urban Life Optimizer is a planning tool that helps users evaluate and improve their day-to-day urban lifestyle. By collecting key information such as where users live and work, their commute time, transportation choices, and financial situation, the application analyzes how these factors impact overall quality of life. It then provides clear, personalized recommendations to help users reduce commuting stress, manage expenses more effectively, and build a sustainable lifestyle with greater financial stability and personal well-being.

## **How we built it**

Our project is a web application that uses a React UI and Express.js that calls prompts Gemini AI via API. The frontend consists of three pages. A welcome page that welcomes users into the application. An input page that takes in the user input and ensures they are entered properly. And finally, and output page that displays the returned suggestion in a clear, formatted style. After clicking a button to submit the input, the frontend calls the backend to prompt the API, which outputs the suggestion.

## **Challenges we ran into**

Early on, we ran into challenges with collaborating on the project with Git. We encountered merge conflicts that took some time to resolve, but through this developed better communication skills that made the latter half of the project go much smoother.

It took many attempts at adjusting our prompt input into the Gemini API to have it produce what we actually required. At first, it kept producing responses with technical terms and referring to the JSON file input. It also regularly hallucinated data and produced inaccurate results. As we added more rules, the AI became tailored to what our project needed.

## **Accomplishments that we're proud of**

We are proud to have created a project that has meaningful impact for individuals and communities in the Greater Vancouver area. As students who are also navigating the challenges of balancing school, work, and other commitments, we designed this tool based on real-life experiences and needs. By addressing common struggles related to scheduling, commuting, and financial planning, our project supports users across a wide range of ages in making more informed decisions about how they structure their daily lives.

## **What we learned**

This was all of our first time implementing an AI model through an API, so we got to learn how to adjust its functionality to tailor to our needs. For instance, we learned that having the AI generate a JSON file to parse into a format we wanted was better than outputting a block of text. For some of the group members, it was the first time using React. We all got to build on our skills, whether it was learning a new language or package, or teaching each other.

In general, we learned that building a small project can make a big impact. We see potential for our product to help people and have plans to develop it further in the hopes that it will make a difference for someone.

## **What's next for Urban Life Optimizer**

Right now, the output mainly consists of text-based descriptions grouped by categories, which can be a bit cumbersome to read. In the future, we plan to modify the output to include more infographics that allow the user to easily identify and understand how aspects of their "optimized" life is crafted. Moreover, potentially make the AI prompt configurable via a configuration file to allow users to customize the style of the output for their target audience.
