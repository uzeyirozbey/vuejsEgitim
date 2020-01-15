const data = {
  "cart": [
    {
      "url": "https://www.amazon.com/gp/product/B00BKQT6F8/ref=ox_sc_act_image_1?ie=UTF8&psc=1&smid=A3UH27URU5GI5Q",
      "image": "https://images-na.ssl-images-amazon.com/images/I/41UJuETOtuL._SS100_.jpg",
      "name": "Daniel Wellington Stainless Steel Watch with Brown Strap",
      "seller": "Daniel Wellington",
      "isAvailable": true,
      "isEligible": true,
      "price": "99.90"
    },
    {
      "url": "https://www.amazon.com/gp/product/B00JP6FP6E/ref=ox_sc_act_title_1?ie=UTF8&psc=1&smid=A2VT4H683M5NNA",
      "image": "https://images-na.ssl-images-amazon.com/images/I/51t0LVOv0QL._SS100_.jpg",
      "name": "Apple Watch Band Milanese Loop",
      "seller": "MoKo",
      "isAvailable": true,
      "isEligible": false,
      "price": "16.90"
    }
  ],
  "saved": [
    {
      "url": "https://www.amazon.com/gp/product/B0142CCDT2/ref=ox_sc_act_image_1?ie=UTF8&psc=1&smid=A2VT4H683M5NNA",
      "image": "https://images-na.ssl-images-amazon.com/images/I/31yjqkf3PAL._SS100_.jpg",
      "name": "Apple Watch Band Soft Silicone Replacement Sport Band for 38mm Apple Watch",
      "seller": "MoKo",
      "isAvailable": true,
      "isEligible": true,
      "price" : "28,76" 
    }
  ]
};

function request(success) {
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          if (success) {
              resolve(data);
          } else {
              reject('Hata');
          }
      }, 1500);
  });
  return promise;
}

 window.Vue = new Vue({
    el: "#app",
    name : "Kart",
    data: {
        isLoading: true,
        cart:[],
        saved : []
    },
    methods:{ 
      removeFromCart: function(index){
       this.cart.splice(index,1)
      },
      
      removeFromSaveforLater: function(index){
        this.saved.splice(index,1);
       },

      saveForLater :function(index){
        const item = this.cart.splice(index,1)
        this.saved.push(item[0]);
      },

      moveToCart:function(index){
        const item = this.saved.splice(index,1);
        this.cart.push(item[0]);
      }
    },
    computed:{
     cartTotal() {
        let total = 0;
        this.cart.forEach((item) => {
          total += parseFloat(item.price, 10)
        });
        return total.toFixed(2);
     }
    },

    created() {
        request(true)
          .then((res) => {
            Vue.isLoading = false
            this.cart = res.cart;
            this.saved =res.saved;
            // return res 
          })
       }
})