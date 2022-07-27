<template>
    <semipolar-spinner
        v-if="isLoading"
        class="loader"
        :animation-duration="2000"
        :size="300"
        color="#4CAF50"
    />
    <form @submit="onSubmit" class="add-form" v-if="!isLoading">
    <div class="form-control">
      <label>Income</label>
      <input v-model="income"  type="number" step="0.01" min="0" name="income" placeholder="Add Income" />
    </div>
    <div class="form-control">
      <label>Description</label>
      <input v-model="description"  type="text" name="description" placeholder="Add Description" />
    </div>
    <input type="submit" value="Save Income" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: 'App-AddIncome',
  data () {
    return {
      income: '',
      description: '',
      isLoading: false
      }
  },
  methods: {
    getDate(lastMonth) {
        let dt =  new Date()
        let year =  dt.getFullYear()
        let month = (dt.getMonth() + 1).toString().padStart(2, "0")

        if(lastMonth == true) {
            month = (dt.getMonth()).toString().padStart(2, "0")
        }
        let day = dt.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    },
    async onSubmit (e) {
        this.isLoading = true
        e.preventDefault()

        const newIncome = {
        "income": this.income,
        "date": this.getDate(false),
        "description": this.description,
        "savings": `api/savings/${await this.getSavings()}`
        }
        this.$emit('add-income', newIncome)

        this.income = 0
        this.description = ''
        this.isLoading = false
    },
    async getSavings() {
      let doesSavingsExist = await this.doesSavingsExist(null);
        if(doesSavingsExist.length == 0) {
            let doesBudgetExist = await this.doesBudgetExist(null)
            if(doesBudgetExist.length > 0) {
                doesBudgetExist = doesBudgetExist[0].id
            }else {
                doesBudgetExist = await this.createBudget()
            }
            doesBudgetExist = `api/budgets/${doesBudgetExist}`
            doesSavingsExist = await this.createSavings(doesBudgetExist)
        }else {
            doesSavingsExist = doesSavingsExist[0].id
        }
        return doesSavingsExist
    },
    async createBudget () {
            let date = this.getDate(true).slice(0,7)
            let isBudgetAutoRenew = await this.doesBudgetExist(date)
            let newBudget = {
                "budget": 0,
                "date": this.boughtDate,
                "autoRenew": false
            }
            if(isBudgetAutoRenew.length > 0) {
                newBudget = {
                    "budget": isBudgetAutoRenew[0].budget,
                    "date": this.boughtDate,
                    "autoRenew": true
                }
            }
            const res = await fetch('api/budgets ', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(newBudget)
             })

            if(res.status === 201) {
                const data = await res.json()
                return data.id
            }             
      },
      async createSavings(budget) {
        const newSavings = {
              "isTargetPassed": false,
              "date": this.boughtDate,
              "budget": budget
          }

          const res = await fetch('api/savings', {
          method: 'POST',
          headers: {
          'Content-type': 'application/json'
          },
          body: JSON.stringify(newSavings)
            })

          if(res.status === 201) {
              const data = await res.json()
              return data.id
          }       
      },
      async doesBudgetExist (date) {
            if(date === null) {
                date = this.getDate().slice(0,7)
            }
            const headers = { "Content-Type": "application/json" };
            let res = await fetch(`api/budgets?date=${date}`, { headers })
            const data = await res.json()
            return data
      },
      async doesSavingsExist (date) {
            if(date === null) {
                date = this.getDate().slice(0,7)
            }
            const headers = { "Content-Type": "application/json" };
            const res = await fetch(`api/savings?date=${date}`, { headers })
            const data = await res.json()
            return data
      },  
  },
  emits: ['add-income', 'newIncome']
}
</script>

<style scoped>
/* .add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
} */
</style>
