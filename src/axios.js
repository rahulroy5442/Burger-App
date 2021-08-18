import React from 'react'

import axios from 'axios'
const instance=axios.create({
    baseURL:'https://burger-apporder-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

export default instance