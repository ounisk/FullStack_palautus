const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) =>{

    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer,0)
}


const favoriteBlog = (blogs) => {
    let current_likes_high = 0
    let current_favorite = ""    
    //return current_likes_high >= blog.likes
    // ? current_favorite
    // : blog

    blogs.map((blog) => {
    if (current_likes_high <= blog.likes) {
        current_favorite = blog           // ei voi olla const, tulee TYpeError assignment to constant variable
        current_likes_high = blog.likes   // ei voi olla const, tulee TYpeError assignment to constant variable

    }})
    console.log('current_favorite', current_favorite)
    return current_favorite
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}