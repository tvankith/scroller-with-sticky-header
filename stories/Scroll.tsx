import React, {  useLayoutEffect, useRef } from 'react'
import './Scroll.css'

export const Scroll = (props: { children: React.ReactNode; gap: string; className?: string }) => {
  
  const scrollerRef = useRef<HTMLDivElement>() 

  useLayoutEffect(()=> {
    const scroller = scrollerRef.current as HTMLDivElement
    if(scroller) {
      scroller.style.setProperty("--block-gap", props.gap)
      const allBlocks = scroller?.querySelectorAll(".blocks") as NodeListOf<HTMLDivElement>
      Array.from(allBlocks).forEach((blocks) => {
        const header = blocks.querySelector('.header') as HTMLDivElement
        const headerHeight = header.getBoundingClientRect().height
        blocks.style.setProperty("--top-padding", headerHeight + "px")
      })
    }
  },[props.gap])

  const onScroll = () => {
    console.log("here")
    const scroller = scrollerRef.current as HTMLDivElement
    const allBlocks = scroller?.querySelectorAll(".blocks") as NodeListOf<HTMLDivElement>
    let blockRightOffset = 0
    let blockLefttOffset = 0
    Array.from(allBlocks).forEach((blocks, index, array) => {
      const scrollOffset = scroller.scrollLeft
      const gap = parseInt(props.gap.split("px")[0])
      blockRightOffset+= index === array.length - 1 ? blocks.getBoundingClientRect().width : blocks.getBoundingClientRect().width + gap
      blockLefttOffset+= index === 0 ? 0 : allBlocks[index - 1].getBoundingClientRect().width + gap
      const header = blocks.querySelector('.header') as HTMLDivElement
      const headerWidth = header.getBoundingClientRect().width
      const blockWidth = index === array.length - 1 ? blocks.getBoundingClientRect().width: blocks.getBoundingClientRect().width + gap
      const scrollerLeftOffset = scroller.getBoundingClientRect().left

      // Left aligned
      if(scrollOffset <= blockLefttOffset) {
        header.classList.remove("header--right")
        header.classList.remove("header--fixed")
        return
      }
      // Right aligned
      if(blockRightOffset - scrollOffset -gap < headerWidth) {
        header.style.setProperty("--left-offset", scrollOffset + blockWidth - headerWidth + "px")
        header.classList.remove("header--fixed")
        header.classList.add("header--right")
        return
      }
      // Fixed & Left aligned
      header.classList.add("header--fixed")
      header.classList.remove("header--right")
      header.style.setProperty("--left-offset", scrollerLeftOffset + "px")
      return
    })
  }
  return <div onScroll={onScroll} className={`scroller ${props.className ? props.className: ''}`} ref={scrollerRef as React.LegacyRef<HTMLDivElement>}>
    {props.children}
  </div>
}


const Group = (props: { children: React.ReactNode }) => {
  return (
    <div className="blocks">
      {props.children}
    </div>
  )
}

const Title = (props: { children: React.ReactNode }) => {
  return (
    <div className="header">
      {props.children}
    </div>
  )
}

const Item = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`block ${props.className}`}>
      {props.children}
    </div>
  )
}

Scroll.Group = Group

Scroll.Title = Title

Scroll.Item = Item

// function App() {

//   return (
//     <div className="wrapper">
//       <Scroll gap={"10px"}>
//         <Scroll.Group>
//           <Scroll.Title>Utrhoncus</Scroll.Title>
//           <Scroll.Item>
//             <div className='block1'></div>
//           </Scroll.Item>
//         </Scroll.Group>

//         <Scroll.Group>
//           <Scroll.Title>Nam feugiat</Scroll.Title>
//           <Scroll.Item>
//             <div className='block2'></div>
//           </Scroll.Item>
//           <Scroll.Item>
//             <div className='block2'></div>
//           </Scroll.Item>
//         </Scroll.Group>

//         <Scroll.Group>
//           <Scroll.Title>Maecenas at purus</Scroll.Title>
//           <Scroll.Item>
//             <div className='block3'></div>
//           </Scroll.Item>
//           <Scroll.Item>
//             <div className='block3'></div>
//           </Scroll.Item>
//           <Scroll.Item>
//             <div className='block3'></div>
//           </Scroll.Item>
//           <Scroll.Item>
//             <div className='block3'></div>
//           </Scroll.Item>
//         </Scroll.Group>
//       </Scroll>
//     </div>
//   )
// }

// export default App