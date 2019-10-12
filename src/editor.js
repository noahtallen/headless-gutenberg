import React, { useState } from "react";

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


const Editor = () => {
    const [ blocks, updateBlocks ] = useState( [] );
    return (
		<div id='editor'>
			<BlockEditorProvider
				value={ blocks }
				onInput={ updateBlocks }
				onChange={ updateBlocks }
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