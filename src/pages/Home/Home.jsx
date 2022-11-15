import React from 'react'
import { First, Second, Third, TextBox } from '../../components'

const Home = () => {
  return (
    <div>
      <First />
      <TextBox>
        The best free photos and images <br /> shared by talented photographers.
      </TextBox>
      <Second />
      <TextBox>
        <p>
          <q>
            I don’t trust words. I trust pictures.
          </q><br />
          <b>
            — Gilles Peress
          </b>
        </p>
      </TextBox>
      <Third />
    </div >
  )
}

export default Home