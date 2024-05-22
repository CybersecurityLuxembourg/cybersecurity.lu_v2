import React from "react";
import { Carousel } from "react-responsive-carousel";
import dompurify from "dompurify";
import { getApiURL } from "./env.jsx";

export function getContentFromBlock(b) {
	let el = null;

	if (b.type === "TITLE1") {
		el = <h4>{b.content}</h4>;
	} else if (b.type === "TITLE2") {
		el = <h5>{b.content}</h5>;
	} else if (b.type === "TITLE3") {
		el = <h6>{b.content}</h6>;
	} else if (b.type === "PARAGRAPH") {
		el = <div dangerouslySetInnerHTML={{
			__html:
			dompurify.sanitize(b.content),
		}} />;
	} else if (b.type === "IMAGE") {
		if (b.content !== null) {
			el = <div className='content-media'>
				<img src={`${getApiURL()}public/get_public_image/${b.content}`}/>
			</div>;
		}
	} else if (b.type === "FRAME") {
		if (b.content !== null) {
			// Sanitize and validate the content as a URL
			const sanitizedContent = dompurify.sanitize(b.content);

			// Create the iframe element directly
			el = <div className='content-media'>
				<iframe
					width="560"
					height="315"
					src={sanitizedContent}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</div>;
		}
	}

	return el;
}

export function buildCarousel(blocks) {
	return <Carousel
		dynamicHeight={false}
		showStatus={false}
		showThumbs={false}
		autoPlay={false}
	>
		{blocks.map((b) => (
			<div key={b.id}>
				<img src={`${getApiURL()}public/get_public_image/${b.content}`}/>
			</div>
		))}
	</Carousel>;
}

export function getNextTitle1Position(content, pos) {
	for (let i = pos + 1; i < content.length; i++) {
		if (content[i].type === "TITLE1") {
			return i + 1;
		}
	}

	return content.length;
}

export function getNextNonImagePosition(content, pos) {
	for (let i = pos + 1; i < content.length; i++) {
		if (content[i].type !== "IMAGE") {
			return i;
		}
	}

	return content.length;
}
