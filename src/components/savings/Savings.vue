<template>
    <td>
        {{ savings.sumIncome }}{{ currency}}
    </td>
    <td>
        {{ savings.budget.budget }}{{ currency }}
    </td>
    <td>
        {{ savings.sumExpenses }}{{ currency }}
    </td>
    <td>
        {{ savings.sumIncome - savings.sumExpenses }}{{ currency}}
    </td>
    <td>
        {{ savings.date.slice(0,7) }}
    </td>
</template>

<script>
export default {
    name: 'App-Savings-Template',
    props: {
        savings: Object
    }    
}
</script>
