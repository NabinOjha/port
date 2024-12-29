'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
];

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

function Blog() {
  const [value, setValue] = useState('');
  const handleChange = async (text: string)=> {
    setValue(text)
  }

  const handleSave = async () => {
    const body = { name: 'Sample Blog', description: value, slug: 'sample-blog' };

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Blog saved:', result);
      } else {
        console.error('Error saving blog:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={handleChange}
        className='text-lg'
        modules={{
          toolbar: toolbarOptions
        }}
        placeholder="IF NOT NOW WHEN??"
      />

      <button onClick={handleSave}>Save Blog</button>
    </div>
  );
}

export default Blog;
