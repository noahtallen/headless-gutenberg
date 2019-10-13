window.setImmediate = f => setTimeout( f, 0 );
import React, { useEffect, useState } from "react";
import Simperium from 'simperium';

/**
 * Gutenberg dependencies:
 */
import {
    BlockEditorProvider,
	BlockList,
	ObserveTyping,
	WritingFlow
} from '@wordpress/block-editor';
import { registerCoreBlocks } from '@wordpress/block-library';
registerCoreBlocks();

/**
 * Gutenberg Styles:
 */
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';

class Ghost {
	constructor( bucket ) {
		this.bucket = bucket;
		this.entries = new Map();
	}

	getChangeVersion() {
		return Promise.resolve( this.cv );
	}

	setChangeVersion( cv ) {
		this.cv = cv;

		return Promise.resolve( cv );
	}

	get( id ) {
		if ( ! this.entries.has( id ) ) {
			return Promise.resolve( { key: id, data: { blocks: [] } } );
		}

		return Promise.resolve( this.entries.get( id ) );
	}

	put( id, version, data ) {
		this.entries.set( id, { version, data } );
		return Promise.resolve( true );
	}

	remove( id ) {
		this.entries.delete( id );
		return Promise.resolve();
	}
}

const Editor = () => {
	const [ bucket, setBucket ] = useState( null );
	const [ loaded, setLoaded ] = useState( false );
	const [ blocks, updateBlocks ] = useState( [] );

	useEffect( () => {
		const bucket = Simperium(
			YOUR_APP_ID_FOR_THIS_DEMO,
			YOUR_API_TOKEN,
			{ ghostStoreProvider: bucket => new Ghost( bucket ) }
		).bucket( 'docs' );
		setBucket( bucket );

		bucket.on( 'update', ( id, { blocks } ) => {
			! loaded && setLoaded( true );
			if ( ! Array.isArray( blocks ) ) {
				bucket.update( 'blocks', { blocks: [] } );
			} else {
				updateBlocks( blocks );
			}
		} );
	}, [] );

	if ( ! loaded ) {
		return <div>Loading…</div>
	}

	return (
		<div id='editor'>
			<BlockEditorProvider
				value={ blocks }
				onInput={ blocks => bucket.update( 'blocks', { blocks } ) }
				onChange={ blocks => bucket.update( 'blocks', { blocks } ) }
			>
				<WritingFlow>
					<ObserveTyping>
						<BlockList />
					</ObserveTyping>
				</WritingFlow>
			</BlockEditorProvider>
		</div>
	);
}

export default Editor;