'use client';

import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import '@/app/_styles/ckeditor.css';

const LICENSE_KEY = process.env.CKEDITOR_LICENSE_KEY;

export default function CKEditorComponent({ onChange, initialContent }: { onChange: (data: string) => void, initialContent: string }) {
	const editorContainerRef = useRef<HTMLDivElement | null>(null);
	const editorRef = useRef<HTMLDivElement | null>(null);
	const editorWordCountRef = useRef<HTMLDivElement | null>(null);
	const editorMenuBarRef = useRef<HTMLDivElement | null>(null);
	const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false);
	const cloud = useCKEditorCloud({ version: '44.1.0', translations: ['ko'] });
	const editorInstanceRef = useRef<any>(null);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	useEffect(() => {
		if (editorInstanceRef.current && initialContent) {
			editorInstanceRef.current.setData(initialContent);
		}
	}, [initialContent]);

	const { ClassicEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			ClassicEditor,
			Alignment,
			Autoformat,
			AutoImage,
			AutoLink,
			Autosave,
			BalloonToolbar,
			BlockQuote,
			Bold,
			Bookmark,
			Code,
			CodeBlock,
			Essentials,
			FindAndReplace,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			FullPage,
			GeneralHtmlSupport,
			Heading,
			Highlight,
			HorizontalLine,
			HtmlComment,
			HtmlEmbed,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			Markdown,
			MediaEmbed,
			PageBreak,
			Paragraph,
			PasteFromMarkdownExperimental,
			PasteFromOffice,
			RemoveFormat,
			SimpleUploadAdapter,
			SourceEditing,
			SpecialCharacters,
			SpecialCharactersArrows,
			SpecialCharactersCurrency,
			SpecialCharactersEssentials,
			SpecialCharactersLatin,
			SpecialCharactersMathematical,
			SpecialCharactersText,
			Strikethrough,
			Subscript,
			Superscript,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextPartLanguage,
			TextTransformation,
			TodoList,
			Underline,
			WordCount
		} = cloud.CKEditor;

	return {
		ClassicEditor,
		editorConfig: {
			toolbar: {
				items: [
					'sourceEditing',
					'|',
					'heading',
					'|',
					'fontSize',
					'fontFamily',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'underline',
					'|',
					'link',
					'insertImage',
					'insertTable',
					'highlight',
					'blockQuote',
					'codeBlock',
					'|',
					'alignment',
					'|',
					'bulletedList',
					'numberedList',
					'todoList',
					'outdent',
					'indent'
				],
				shouldNotGroupWhenFull: true
			},
			plugins: [
				Alignment,
				Autoformat,
				AutoImage,
				AutoLink,
				Autosave,
				BalloonToolbar,
				BlockQuote,
				Bold,
				Bookmark,
				Code,
				CodeBlock,
				Essentials,
				FindAndReplace,
				FontBackgroundColor,
				FontColor,
				FontFamily,
				FontSize,
				FullPage,
				GeneralHtmlSupport,
				Heading,
				Highlight,
				HorizontalLine,
				HtmlComment,
				HtmlEmbed,
				ImageBlock,
				ImageCaption,
				ImageInline,
				ImageInsert,
				ImageInsertViaUrl,
				ImageResize,
				ImageStyle,
				ImageTextAlternative,
				ImageToolbar,
				ImageUpload,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				ListProperties,
				Markdown,
				MediaEmbed,
				PageBreak,
				Paragraph,
				PasteFromMarkdownExperimental,
				PasteFromOffice,
				RemoveFormat,
				SimpleUploadAdapter,
				SourceEditing,
				SpecialCharacters,
				SpecialCharactersArrows,
				SpecialCharactersCurrency,
				SpecialCharactersEssentials,
				SpecialCharactersLatin,
				SpecialCharactersMathematical,
				SpecialCharactersText,
				Strikethrough,
				Subscript,
				Superscript,
				Table,
				TableCaption,
				TableCellProperties,
				TableColumnResize,
				TableProperties,
				TableToolbar,
				TextPartLanguage,
				TextTransformation,
				TodoList,
				Underline,
				WordCount
			],
			balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
			fontFamily: {
				supportAllValues: true
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			heading: {
				options: [
					{
						model: 'paragraph' as 'paragraph',
						title: 'Paragraph',
						class: 'ck-heading_paragraph'
					},
					{
						model: 'heading1' as 'heading1',
						view: 'h1',
						title: 'Heading 1',
						class: 'ck-heading_heading1'
					},
					{
						model: 'heading2' as 'heading2',
						view: 'h2',
						title: 'Heading 2',
						class: 'ck-heading_heading2'
					},
					{
						model: 'heading3' as 'heading3',
						view: 'h3',
						title: 'Heading 3',
						class: 'ck-heading_heading3'
					},
					{
						model: 'heading4' as 'heading4',
						view: 'h4',
						title: 'Heading 4',
						class: 'ck-heading_heading4'
					},
					{
						model: 'heading5' as 'heading5',
						view: 'h5',
						title: 'Heading 5',
						class: 'ck-heading_heading5'
					},
					{
						model: 'heading6' as 'heading6',
						view: 'h6',
						title: 'Heading 6',
						class: 'ck-heading_heading6'
					}
				]
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true,
						attributes: true,
						classes: true
					}
				]
			},
			image: {
				toolbar: [
					'toggleImageCaption',
					'imageTextAlternative',
					'|',
					'imageStyle:inline',
					'imageStyle:wrapText',
					'imageStyle:breakText',
					'|',
					'resizeImage'
				]
			},
			initialData: initialContent,
			language: 'ko',
			licenseKey: LICENSE_KEY,
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			list: {
				properties: {
					styles: true,
					startIndex: true,
					reversed: true
				}
			},
			menuBar: {
				isVisible: true
			},
			placeholder: '내용을 입력해주세요.',
			table: {
				contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
			},
			simpleUpload: {
				uploadUrl: `${process.env.SERVER_URL}/attachment/upload-ckeditor`,
				withCredentials: true,
				headers: {
					'X-CSRF-TOKEN': 'CSRF-Token',
					Authorization: 'Bearer <JSON Web Token>'
				},
				onUploadComplete: (response: { url: string }) => {
					const imageUrl = response.url;
					const editor = editorInstanceRef.current;
					if (editor) {
						editor.model.change((writer: any) => {
							const imageElement = writer.createElement('imageBlock', {
								src: imageUrl
							});
							editor.model.insertContent(imageElement, editor.model.document.selection);
						});
					}
				}
			}
		}
	};
}, [cloud, isLayoutReady, initialContent]);

return (
	<div className="main-container">
		<div className="editor-container editor-container_classic-editor editor-container_include-word-count" ref={editorContainerRef}>
			<div className="editor-container__editor">
				<div ref={editorRef}>
					{ClassicEditor && editorConfig && (
						<CKEditor
							onReady={editor => {
								editorInstanceRef.current = editor;
								const wordCount = editor.plugins.get('WordCount');
								if (editorWordCountRef.current) {
									editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
								}

								if (editorMenuBarRef.current) {
									editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView!.element!);
								}
							}}
							onAfterDestroy={() => {
								if (editorWordCountRef.current) {
									Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
								}

								if (editorMenuBarRef.current) {
									Array.from(editorMenuBarRef.current.children).forEach(child => child.remove());
								}
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								onChange(data);
							}}
							editor={ClassicEditor}
							config={editorConfig as any}
						/>
					)}
				</div>
			</div>
			<div className="editor_container__word-count" ref={editorWordCountRef}></div>
		</div>
	</div>
);
}
