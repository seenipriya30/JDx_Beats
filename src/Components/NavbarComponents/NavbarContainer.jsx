import Logo from "./Logo"
import Menu from "./Menu"
import GlobalSearch from "./GlobalSearch"

let NavbarContainer = () => {
  return <section className="h-[70px] w-[100%]">
    <article className="h-[100%] w-[95%] m-auto flex items-center justify-between gap-4">
        <Logo/>
        <GlobalSearch />
        <Menu/>
    </article>
  </section>
}

export default NavbarContainer