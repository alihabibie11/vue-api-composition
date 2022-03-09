<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link :to="{ name: 'transaction.index' }" class="btn btn-primary btn-sm rounded mb-3">
          Back
        </router-link>

        <div class="card rounded shadow">
          <div class="card-header">
            Edit Transaction
          </div>
          <div class="card-body">
            <!-- cegah behavior submit, dan call method store -->
            <form @submit.prevent="update()">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" v-model="transaction.title">
              <div v-if="validation.title" class="text-danger">
                {{ validation.title[0] }}
              </div>
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" v-model="transaction.amount">
              <div v-if="validation.amount" class="text-danger">
                {{ validation.amount[0] }}
              </div>
              <label class="form-label">Time</label>  
              <input type="text" class="form-control" v-model="transaction.time">
              <div v-if="validation.time" class="text-danger">
                {{ validation.time[0] }}
              </div>
              <label class="form-label">Type</label>
              <select id="type" class="form-select" v-model="transaction.type">
                <option value="revenue">Revenue</option>
                <option value="expensive">Expensive</option>
              </select>
              <div v-if="validation.type" class="text-danger">
                {{ validation.type[0] }}
              </div>
              <button class="btn btn-outline-primary mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from 'axios';

export default {
  setup(){
    // data binding, simpan data2 dari input utk insert to db
    // like v-modal binding, save realtime, must same name
    // change to let
    let transaction = reactive({
      title : '',
      amount : '',
      time : '',
      type : ''
    })

    //for validarion
    const validation = ref([])

    const router = useRouter()

    const route = useRoute()

    onMounted(() => {
      axios.get(`http://127.0.0.1:8000/api/transaction/${route.params.id}`)
      .then((result) => {
        transaction.title = result.data.data.title
        transaction.amount = result.data.data.amount
        transaction.time = result.data.data.time
        transaction.type = result.data.data.type
      }).catch((err) => {
        console.log(err.response.data)
      })
    })

    function update() {
      //link dan data dari reactive
      axios.put(`http://127.0.0.1:8000/api/transaction/${route.params.id}`, transaction)
      //if complete it will redirect to router push
      .then(() => {
        router.push({
          name: 'transaction.index'
        })
      })
      // if error it will fill validation value with error response data
      .catch((err) => {
        validation.value = err.response.data
      })
    }

    return {
      transaction, validation, router, update
    }
  }
};
</script>
