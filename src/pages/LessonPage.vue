<template>
  <div>
    <div class="d-flex flex-row-reverse p-5">
      <button class="btn btn-lg btn-success" role="link" v-bind:disabled="true">
        <span class="mx-2">Total price: </span>{{ total_price }} <fa icon="dollar-sign" />
      </button>
      <button class="btn btn-lg btn-success mx-2" role="link" v-bind:disabled="true">
        <fa icon="shopping-cart" /> {{ total_items }}
      </button>
      <div class="me-auto">
        <fa icon="magnifying-glass" />
        <span> Search Bar : </span>
        <input type="text" placeholder="Enter location" @keyup="search" class="rounded-5 fs-6 p-2 px-3"/>
      </div>
    </div>
    <div class="container ">
      <h4 class="err-styling" v-if="error">{{ error }}</h4>
      <div class="row row-cols-1 row-cols-lg-2 justify-content-center">
        <div v-for="item in searchResults" :key="item._id" class="col">
          <div class="card rounded-5" >
            <div class="card-body">
              <div class="row">
                <div class="col col-lg-8">
                  <ul class="list-unstyled">
                    <li><span class="fw-bold"> Topic: </span> <span class="text-muted"> {{ item.topic }} </span> </li>
                    <li><span class="fw-bold"> Price: </span> <span class="text-muted"> {{ item.price }} </span> </li>
                    <li><span class="fw-bold"> location: </span> <span class="text-muted"> {{ item.location }} </span> </li>
                    <li><span class="fw-bold"> Available space: </span> <span class="text-muted"> {{ item.space }} </span> </li>
                  </ul>
                </div>
                <div class="col d-flex flex-row-reverse">
                  <img src="http://node-env.eba-u2thtivw.eu-west-2.elasticbeanstalk.com/images/calculator.png" class="img-size" alt="">
                </div>
              </div>
              <div class="d-flex flex-row-reverse">
                <button v-on:click="addItemToCart(item)" class="btn btn-lg btn-success"><fa icon="circle-plus" /> Add to cart </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container p-5 mt-5">
      <div class="row">
        <div class="col-md-2 mt-2">
          <div class="form-group">
            <span class="fs-5"><fa icon="user" /> User Information: </span>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input type="text" class="form-control m-2" v-model="user_name" placeholder="Please enter your name">
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input type="number" class="form-control m-2" v-model="contact_number" placeholder="Please enter your contact number">
          </div>
        </div>
        <div class="col mt-1 ms-4">
          <button class="btn btn-success" v-on:click="checkoutCart" role="link" v-bind:disabled="total_items == 0">
            <span class="mx-2">Checkout</span> <fa icon="arrow-right-to-bracket" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LessonService from '../services/LessonService'
import SearchService from '../services/SearchService'
import OrderService from '../services/OrderService'
import { createToaster } from "@meforma/vue-toaster";
import { ref, onMounted } from 'vue'

const toaster = createToaster({ position: "top", duration: 2000, maxToasts: 3 });

// Data variables
let user_name = ref('')
let contact_number = ref('')
let searchResults = ref([])
let item_id = ref('')
let total_price = ref(0)
let total_items = ref(0)
let error = ref('')

// Methods
const search =(async (e) => {
   await SearchService.getSearchResults(e.target.value.trim())
  .then(res => {
    res.clone().json().then( resp => {
      searchResults.value = resp
    })
  })
  .catch(err => {
    error.value = err
  });
})

const addItemToCart = (async (item) => {
  if (item.space <= 0) {
    toaster.show(`Lesson not available !!!`, {type: "error"});
    return
  }
  let res = await LessonService.updateLesson(item._id)
  if (res.status == 201) {
    total_items.value += 1
    total_price.value += item.price
    item_id.value = item._id
    searchResults.value = await LessonService.getLessons();
    toaster.show(`Item added to cart successfully`, {type: "success"});
  } else {
    error.value = "Failed to update data"
    toaster.show(`Lesson space updation failed`, {type: "error"});
  }
})

const checkoutCart = (async () => {
  if (user_name.value == ''){
    toaster.show(`Please enter your name !!!`, {type: "error"});
  } else if (contact_number.value == ''){
      toaster.show(`Please enter your contact number !!!`, {type: "error"});
  } else {
      let res = await OrderService.createOrder(user_name.value, contact_number.value, item_id.value, total_items.value)
      if (res.status == 201) {
        user_name.value = ''
        contact_number.value = ''
        item_id.value = ''
        total_items.value = 0
        total_price.value = 0
        toaster.show(`Order placed successfully`, {type: "success"});
    } else {
        error.value = "Failed to create order"
        toaster.show(`Order creation failed`, {type: "error"});
    }
  }
})

// Callback function
onMounted(async () => {
  try {
    searchResults.value = await LessonService.getLessons();
  } catch (err) {
      error.value = err.message;
  }
})

</script>

<style scoped>

* {
  font-size: 21px;
}

.image-size{
  height: 60px;
  width: 60px;
}

.card{
  border-color: #53c9bf;
  border-width: 3px;
  width: 30rem;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}

.img-size{
  height: 90px;
  width: 90px;
}

.btn-success {
    color: rgb(0, 0, 0);
    background-color: #53c9bf;
    border-color: #000000;
    border-radius: 25px;
}

.btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open>.dropdown-toggle.btn-success {
    color: #fff;
    background-color: #2f746e;
    border-color: #000000;
}

.err-styling {
  text-align: center;
  font-size: 35px;
  text-decoration: underline;
  background-color: rgba(32, 4, 4, 0.89);
  padding: 50px;
  color: rgb(255, 0, 0);
}

</style>
