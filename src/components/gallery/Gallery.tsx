import { component$ } from "@qwik.dev/core";


export default component$(() => {

	return (
		<section class="gallery">
			<figure style="--index:1">
				<figcaption>Nantes</figcaption>
				<img loading="lazy" src="/imgs/home/stroumpf.webp" alt="Sculpture de Stroumpf" height="300" />
			</figure>
			<figure style="--index:2">
				<figcaption>La Trinité sur Mer</figcaption>
				<img loading="lazy" src="/imgs/home/stroumpf.webp" alt="Sculpture de Stroumpf" height="300" />
			</figure>
			<figure style="--index:3">
				<figcaption>Saint Nazaire</figcaption>
				<img loading="lazy" src="/imgs/home/stroumpf.webp" alt="Sculpture de Stroumpf" height="300" />
			</figure>
		</section>
	)
});