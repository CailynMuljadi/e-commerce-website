import { Button } from "@/components/ui/button"

const Home=() => {
  return <div className="p-10 bg-shop-light-pink">
    <h2 className="text-2xl font-semibold font-poppins">Welcome to our store!</h2>
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
    </div>
};

export default Home