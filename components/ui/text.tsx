import {cn} from "@/lib/utils";

 const Title =({
    children,className
}:{
    children:React.ReactNode, className?:string
})=>{
    return (

    <h2 className={cn("text-3xl md:text-3xl font-bold text-shop-dark-green capitalize tracking-wide font-sans")}>{children}</h2>
    );
};

export {Title};
