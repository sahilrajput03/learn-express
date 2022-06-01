import axios from 'axios'
const {warn, log} = console

warn('1. This is warning...')

log('2. This is simple log...')

log(await Promise.resolve('3. I am a promise value.'))

log('3.', await axios.get('https://loveapi.ml/numbersapi/1/trivia').data)
