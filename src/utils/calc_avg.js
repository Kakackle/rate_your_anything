const calc_avg = (post, ratings) => {
    let val = parseInt(post.avg_rating);
    ratings.forEach((rat)=>{
        val += parseInt(rat.value);
    })
    // console.log('val: ', val);
    // console.log('calc_avg: ', val/(ratings.length + 1));
    return val/(ratings.length + 1);
}

export default calc_avg;