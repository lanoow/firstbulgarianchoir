"use client";

import { PhotoProvider } from 'react-photo-view';
import { MediaType } from '@prisma/client';
import React, { Fragment } from 'react';
import { SafeGallery } from '@/types';
import GalleryImage from './image';
import Video from './video';

import 'react-photo-view/dist/react-photo-view.css';

interface GalleryClientProps {
	gallery: SafeGallery[];
}

const GalleryClient: React.FC<GalleryClientProps> = ({ gallery }) => {
	return (
		<PhotoProvider>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{gallery.map((media: SafeGallery) => (
					<Fragment key={media.id}>
						{media.mediaType === MediaType.VIDEO ? (
							<Video media={media.media} />
						) : (
							<GalleryImage media={media.media} />
						)}
					</Fragment>
				))}
			</div>
		</PhotoProvider>
	)
}

export default GalleryClient;