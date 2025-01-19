import { facebookIcon, Linkedin, XIcon } from "@/utils/icons"
import Link from "next/link"

const footerLinks = [
    {name: 'Sobre', link: '/about'},
    {name: 'Contato', link: '/contact'},
    {name: 'Termos de Uso', link: '/terms'},
    {name: 'API', link: '/bookboxApi'},
    {name: 'News', link: '/bookboxNews'},
]


const social = [
    {name: 'Facebook', link: '/', icon: facebookIcon},
    {name: 'Linkedin', link: '/', icon: Linkedin},
    {name: 'X', link: '/', icon: XIcon},
   
]

export function Footer(){
    return (
        <footer className="flex justify-center items-center gap-10 flex-col p-10 ">
            <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex justify-around items-center gap-5">
                    {footerLinks.map((link, i) => (
                        <div key={i} >
                            <Link href={link.link} >
                               {link.name}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-3 text-3xl mt-5 md:text-4xl">
                    {social.map((link, i) => (
                        <div key={i} >
                            <Link href={link.link} target="_blank" rel="noopener noreferrer">
                                {link.icon}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <p className="text-sm md:text-base">&#169; Bookbox | Feito com ❤️ <Link className="text-azul-primario font-semibold" href={'https://www.linkedin.com/in/fabricio-silva-246a12273'}>Fabricio Silva</Link></p>
            </div>
        </footer>
    )
}