import Container from "@/components/Container";
import { Button } from "@/components/ui/button"
import React from "react";


const Home=() => {
  return
  <Container className="bp-light-pink">
     <h2 className="text-xl font-semibold font-poppins">Welcome to our store!</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quibusdam cum, 
      maxime, nihil recusandae atque ex aliquid odit adipisci, necessitatibus commodi. 
      Consectetur quae magni quasi nesciunt dolore? Consequatur quaerat porro, 
      voluptatum necessitatibus aperiam a quod, maiores ipsum excepturi voluptatibus quia, 
      sequi optio. Pariatur in magnam nihil nostrum modi nulla repudiandae.
      </p>
      <Button size="lg" variant="destructive">
        Check Out
      </Button>
    </Container>
};

export default Home