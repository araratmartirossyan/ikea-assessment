
1. I choosed Web-App + Rest API format of application because i have more experience with it
2. In case of uploading files we need to update currently existing values if price or articles amount is changed? I think it's smart to do, but i will keep it to the end of task to concentrate on Requirements first.  
3. I made two POC one with mongo db one with mysql, with mongo db everything looks pretty easy to get values and calculate final result, but from schema perspective i saw that mysql may feet better. We have 3 Tables Article - Product and ArticleContain. I remembered how I first learned Mysql and made a similar structure and decided to go with Mysql. In perspective of usage It can handle any amount of data, up to as much as 50 million rows or more.
4. My favorite database is MongoDb because it's super easy to use. Almost by snap. Im really handy with aggregation pipelines, and prefer this way to work versus SQL queries. But this time i gonna try MySql.
5. I started to calculate quantities of products and after couple implementation of this function choosed the one which i think doing job easier from code perspective. 
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

      // Then we need to substract value from array of article to be sure that second product will be calculated correctly
      availiableArticles = articles.map(article => {
        const findStock = stocks.find(
          neededStock => neededStock.articleId === article.art_id
        )

        if (!findStock) {
          return article
        }

        return {
          ...article,
          // Here we are using needed value to substract 
          stock: article.stock - quantity * findStock.needed
        }
      })

      // By the end we are pushing it into array of availiableProducts
      availiableProducts.push({
        ...product,
        quantity,
        totalPrice: quantity === 0 ? product.price : quantity * product.price
      })

      // I tried different approach (Recursy, Reduce, Substract items one by one) i tried to find better way for return value as fast as possible and keep it readable. And basically to many copy operations is pretty slow but using pure "for" is not readable. So i choosed this way.
    })
   ```
6. Met a problem that type orm not showing decimals as number but as string. But before google it i tried to find solution by myself, looks like simple 
```js
 extra: {
    decimalNumbers: true
  }
```
fixing the problem