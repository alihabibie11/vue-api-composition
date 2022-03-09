<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <router-link :to="{ name: 'transaction.create' }" class="btn btn-primary btn-sm rounded mb-3">
          + Add Transaction
        </router-link>

        <div class="card rounded shadow">
          <div class="card-header">
            Transaction List
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <!-- loop, :key for index/id  -->
                <tr v-for="(tr, index) in transactions.data" :key="index">
                  <td>{{ tr.title }}</td>
                  <td>{{ tr.amount }}</td>
                  <td>{{ tr.type }}</td>
                  <td>
                    <div class="btn-group">
                      <router-link :to="{ name: 'transaction.edit', params: {id:tr.id}}" class="btn btn-sm btn-outline-info">
                        Edit
                      </router-link>
                      <button @click.prevent="destroy(tr.id, index)" class="btn btn-sm btn-outline-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// onMounted hook/even terjadi sudah show komponen index will do what (etc bfr,after Mount), reff obj data if without api composition, here we use api composition so use onMounted
import { onMounted, ref } from "vue";

export default {
  setup() {
    //wadah utk nampung data dari apu use ref dan isinya array krana banyak
    // reactive state = can modif realtime
    let transactions = ref([]);

    onMounted(() => {
      // get data from api endpoint
      axios.get('http://127.0.0.1:8000/api/transaction')
      .then((result) => {
        transactions.value = result.data
        console.log(result.data)
      }).catch((err) => {
        console.log(err.response.message)
      });
    })

    function destroy(id, index) {
        //link api delete dan param id
        axios.delete(`http://127.0.0.1:8000/api/transaction/${id}`)
        //if complete, 
        .then(() => {
          transactions.value.data.splice(index, 1)
        })
        // if error it will fill validation value with error response data
        .catch((err) => {
         console.log(err.response.data)
        })
      }
  return {
      transactions, destroy
    }
  }
};
</script>
