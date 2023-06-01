import { Orbit } from '@uiball/loaders'

export const Loader = () => {
  return (
    <div className="container-loader">
      <Orbit
        size={25}
        speed={1.5}
        color="black"
      />
    </div>
  )
}
