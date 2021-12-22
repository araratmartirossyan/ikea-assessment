## Process
1. I chose the Web-App + Rest API format of application because I have more experience with it and understand pitfalls.
2. For Backend I prefer to use well test and known framework - Nest Js. Like the way how it works. 
3. For Frontend I chose to use React, with Vite, for the experiment I used Effector as state manager. (UPDATE: Amazing state manager, except sometimes you can just miss some piece of communication between Effects and Stores)
   
4. In case of uploading files we need to update currently existing values if the price or articles amount is changed? I think it's smart to do, but I will keep it to the end of the task to concentrate on Requirements first.  
   1. I created File Uploader and attached an update in case of a similar art_id present in the uploaded file.
   2. Same for Product uploader

5. My favorite database is MongoDB. But this time I gonna make a challenge for myself and will try MySql.
   
6. I made two POCs one based on mongo, another on MySQL. With mongo DB everything looks pretty easy to get values and calculate the final result, but im not sure about future prove. I think MySQL may fit better. We have 3 Tables Article - Product and ArticleContain. And I see a clear relationship between them. (I remembered how I first time learned Mysql and made a similar structure). Decided to go with Mysql. In the perspective of usage, It can handle any amount of data, up to as much as 50 million rows or more. For Warehousing solutions, it can be helpful.

7. I started to calculate quantities of products and after couple implementation of this function choosed the one which i think doing job easier from code perspective. 
```javascript
  products.forEach(product => {
    const stocks = product.contain_articles.map(article => {
    // First i need to find stock amount in availiable articles
      const findArticle = availiableArticles.find(
        item => item.art_id === article.art_id.art_id
      )
      // then we can simple divide stock into needed article from product 
      const quantity = Math.floor(findArticle.stock / article.amount_of)

      // We need to return estimated quantity and ofcourse articleId and amount needed to use it in future to substract this amount from stock 
      return {
        quantity,
        articleId: article.art_id.art_id,
        needed: article.amount_of
      }
    })

    // We need too find min value from all needed articles, which will represent our quantity of products
    const quantity = Math.min(...stocks.map(item => item.quantity))

    
    // By the end we are pushing it into array of availiableProducts
    availiableProducts.push({
      ...product,
      quantity,
      totalPrice: quantity === 0 ? product.price : quantity * product.price
    })

    // I tried a different approach (Recursy, Reduce, Subtract items one by one) I tried to find a better way to return value as fast as possible and keep it readable. And basically, too many copy operations are pretty slow but using pure "for" is not readable. So I chose this way.
  })
```
9. Met a problem that types or does not show decimals as a number but a string. But before googling it I tried to find a solution by myself, looks like a simple 
```js
 extra: {
    decimalNumbers: true
  }
```
10. I spent too much time on content delivery and algorithms. Now I need to focus on frontend and refactoring of a nasty piece of logic.
11. For a fast start with FE I chose Tailwind and built a simple UI interface. Interface super simple. Every Warehouse worker can understand it (i hope so ;)  my wife used to work in the warehouse and she checked it, so it's proven hahaha)
12. Since logic on BE had already been implemented, I decided to spend more time on FE, to make it more as the warehouse application looks like.
13. Met logical dilemma with point number 3 and 4 in Requirements, if we need to show products based on articles, then, (for example,  we have two Chairs and One Table), but according to stock, it's possible to order only 1 Chair and 1 Table or 2 Chairs so basically I can't give priority to the product. What do I need to do?
  1. I decided to show all available stock and the "POSSIBLE" quantity of products with the assumption that warehouse workers know that some articles may be not available at the moment.
  2. At the moment when a worker will add the product to the order I will check if it's possible to order this product with the required quantity if not then I will show a message and the user can remove the product from the order.
    1. Possible improvements:
     -  Show which exactly articles is missing 
     -  Find the way to replace it  (Grouped articles f.e., one screw can be replaced with other)
     -  UI: Give possibility to change quantity inside order
     -  Show suggested products that can be similar but maybe slightly different
  
14.  Went a bit far with UI, I made a small "Onboarding" system for workers who are responsible for filling in articles. For example, the database is empty in the new warehouse. Sacrificed components creation part to make it faster. (already 12 hours working on it)
  3. Possible UI improvements:
     - Add a list of articles per product
     - Add quantity selector
     - Create standart components (Buttons, Form, etc)
     - Properly type inputs and outputs
     - Show possible product replacements
     - Show which exactly article is not available in case of invalid order
     - Add possibility to upload CSV and XLS files
    
15. Everything looks good, time to put everything together with Docker.
    1.  I created Docker for each project
    2.  Made Docker-Compose
    3.  Added "wait" script for api to wait for DB host
    4.  Attached env variables everywhere
    5.  Double checked if it is possible to run the project on a new machine without any problems
16. Already out of time, I really wanna split Dockerfile for production and dev but I still need to finalize assumption and documentation:
    1.  Possible improvements in Docker:
        - Add Dev and Prod staging
        - Split variables between Dev and Prod
        - Add deployment scripts for Git Hub actions
        - Maybe we need to add k8s here if it will be a real solution (because I can imagine the number of articles and products which can be consumed per second)
17. Working on documentation/


## Improvements
Api:
  - Refactor algorithm to make it work with SQL queries and easy with a js function
  - Write tests for all pieces of logic related to calculation and data exchange
  - Write end 2 end tests for flow
  - Refactor update methods for articles/products to make them easy to update and less cheap
  - Better typing for input-output
  - Validation of input and output
  - Parse CSV or XLS file not only JSON
  - Create an Article module
  - Better typing for methods in services
  - Refactor types
  - Nice To Have: Create microservices (Nest Microservices) per each module (Article, Products, Order)
  - Security rules such as:
    - Content Security Policy
    - DNS Prefetch Control
    - Expect CT
    - Frame Guard
    - No Sniff
    - Permitted Cross-Domain Policies
    - Referrer-Policy
    - XSS Filter
    - DDoS protection timeout

FE:
  - Write unit tests
  - Create more components stack (Buttons, Form, etc)
  - Types for Effector Store
  - Add a list of articles per product
  - Add quantity selector component
  - Properly type inputs and outputs for request
  - Show possible product replacements
  - Show which exactly article is not available in case of invalid order
  - Add possibility to upload CSV and XLS files
  - Work better on order flow (state of order can be improved)
  - Add quantity selector to OrderSummary

Docker and Deployment:
  - Add Dev and Prod staging
  - Split variables between Dev and Prod
  - Add deployment scripts for Git Hub actions
  - Maybe we need to add k8s here if it will be the real solution (because I can imagine the amount of articles and products which can be consumed per second)
  - Add pre-commit and linting + test stage in the pipeline

Nice to Have:
 - Auth for each warehouse worker to protect data
 - K8S per each microservice and microservices itself


## Task review:
It's one of the most interesting technical challenges which I built in my carrier. I enjoyed every problem and lost count of time. If this work is full of the same challenges, then I will enjoy it every day. I can only imagine what kind of experience I will gain, doing such tasks. Thanks for the chance to work on it. 