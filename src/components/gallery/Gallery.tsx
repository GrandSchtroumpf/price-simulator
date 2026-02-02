import { component$, useStyles$ } from "@qwik.dev/core";
import Img1 from '~/media/gallery/1.webp?jsx';
import Img2 from '~/media/gallery/2.webp?jsx';
import Img3 from '~/media/gallery/3.webp?jsx';
import Img4 from '~/media/gallery/4.webp?jsx';
import Img5 from '~/media/gallery/5.webp?jsx';
import style from './Gallery.css?inline';

export default component$(() => {
	useStyles$(style);
	return (
		<section id="gallery">
			<div class="scroll-indicator">
				<div class="line"></div>
				<div class="diamonds"></div>
			</div>
			<div class="slot" style="--index:1">
				<figure>
					<figcaption>Terrasse et garde corps</figcaption>
					<Img1 alt="Ouvrage de menuiserie" height="300" />
				</figure>
				<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur unde architecto ducimus in sapiente deserunt obcaecati voluptate, quas saepe placeat cum id soluta iusto et officiis, esse reprehenderit ipsum earum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, amet natus vel labore laboriosam et officia, maxime repellat numquam temporibus facere dolores voluptatem deleniti dolore quis! Odit facere culpa illo!</p>
			</div>
			<div class="slot" style="--index:2">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae officiis voluptate error molestias, quia harum atque a quibusdam quae odio, quidem saepe obcaecati accusamus perferendis minus molestiae commodi tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor in illo sed obcaecati excepturi modi sequi, architecto voluptatem numquam molestias dolores esse, debitis nulla nam, similique consequatur amet incidunt iusto.</p>
				<figure>
					<figcaption>Soutènement bois</figcaption>
					<Img2 alt="Ouvrage de menuiserie" height="300" />
				</figure>
			</div>
			<div class="slot" style="--index:3">
				<figure>
					<figcaption>Brise vue</figcaption>
					<Img3 alt="Ouvrage de menuiserie" height="300" />
				</figure>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae officiis voluptate error molestias, quia harum atque a quibusdam quae odio, quidem saepe obcaecati accusamus perferendis minus molestiae commodi tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor in illo sed obcaecati excepturi modi sequi, architecto voluptatem numquam molestias dolores esse, debitis nulla nam, similique consequatur amet incidunt iusto.</p>
			</div>
			<div class="slot" style="--index:4">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae officiis voluptate error molestias, quia harum atque a quibusdam quae odio, quidem saepe obcaecati accusamus perferendis minus molestiae commodi tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor in illo sed obcaecati excepturi modi sequi, architecto voluptatem numquam molestias dolores esse, debitis nulla nam, similique consequatur amet incidunt iusto.</p>
				<figure>
					<figcaption>Terrasse et bardage</figcaption>
					<Img4 alt="Ouvrage de menuiserie" height="300" />
				</figure>
			</div>
			<div class="slot" style="--index:5">
				<figure>
					<figcaption>Portail principal</figcaption>
					<Img5 alt="Ouvrage de menuiserie" height="300" />
				</figure>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae officiis voluptate error molestias, quia harum atque a quibusdam quae odio, quidem saepe obcaecati accusamus perferendis minus molestiae commodi tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor in illo sed obcaecati excepturi modi sequi, architecto voluptatem numquam molestias dolores esse, debitis nulla nam, similique consequatur amet incidunt iusto.</p>
			</div>
		</section>
	)
});