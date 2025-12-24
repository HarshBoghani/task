import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const params = new URLSearchParams(window.location.search);
const roomName = params.get('room') || 'lobby';
document.getElementById('room-id').innerText = roomName;

const ydoc = new Y.Doc();

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${protocol}//${window.location.host}`;

const provider = new WebsocketProvider(wsUrl, roomName, ydoc);
const ymap = ydoc.getMap('data');

ymap.observe(() => {
    document.getElementById('out').innerText = JSON.stringify(ymap.toJSON(), null, 2);
});

document.getElementById('btn').onclick = () => {
    const k = document.getElementById('key').value;
    const v = document.getElementById('val').value;
    if (k) {
        ymap.set(k, isNaN(v) || v === '' ? v : Number(v));
        document.getElementById('key').value = '';
        document.getElementById('val').value = '';
    }
};