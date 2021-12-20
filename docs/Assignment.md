# Code Assignment

## The problem

In this scenario, you will have to design a warehousing solution for use in our sales process. In order to display what customers can buy, we need to know which products are in stock. A product itself is composed internally of multiple articles and each article has their own stock. 

### Articles & products
Articles should contain an identification number, a name and available stock.
Products should have a name, price and a list of articles alongside with their respective quantities in the product.

Please refer to the provided example files to take a look at JSON files which your application should be able to process.

## The solution

The solution you submit will be reviewed internally by one of our technical interviewers. It will be the basis for a discussion of your approach to software engineering in the subsequent technical interview with the same technical interviewer.

You have both the freedom and the responsibility to decide what to implement and what to leave out of your submission. We encourage you to document your assumptions as well as further improvements in a README file. Additionally, please assume that you will have ownership of the delivery and operations of your product.

Feel free to spend as much time as you want, but please be advised that we understand this is an example exercise. Focus on the parts that are important to you and think of showcasing your decision making and prioritization skills as well.

## The constraints

You are free to choose any language, framework, library or architecture that is sensible from your point of view. However, we can not guarantee that your technical interviewer will be an expert in the stack that you choose - be prepared to explain your code on an abstract level in the interview itself.

We encourage you to create a repository on github for the purpose of your submission.

Please provide clear instructons describing how to run your code.

## Functional requirements

1. It should be possible to import articles from a file, see the attached articles.json for a reference file.
2. It should be possible to import products from a file, see the attached products.json for a reference file.
3. It should be possible to get a list of all products and their currently available quantities based on the current stock of articles.
4. It should be possible to provide a list of products and quantities which are to be sold as part of an order. Your application should determine if this transaction is possible given the current stock state, and update the stock accordingly.