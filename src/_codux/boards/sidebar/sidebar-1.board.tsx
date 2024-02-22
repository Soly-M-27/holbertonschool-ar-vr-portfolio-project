import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Sidebar from '../../../components/Sidebar';

export default createBoard({
    name: 'Sidebar 1',
    Board: () => <Sidebar />,
    isSnippet: true,
});