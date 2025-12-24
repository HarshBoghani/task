import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const params = new URLSearchParams(window.location.search);
const roomName = params.get('room') || 'lobby';
document.getElementById('room-id').innerText = roomName;

const ydoc = new Y.Doc();

// Automatic protocol detection for local vs production
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${protocol}//${window.location.host}`;

const provider = new WebsocketProvider(wsUrl, roomName, ydoc);
const ymap = ydoc.getMap('data');

// Sync UI when Yjs data changes
ymap.observe(() => {
    const data = ymap.toJSON();
    document.getElementById('out').innerText = JSON.stringify(data, null, 2);
});

// CREATE / UPDATE logic
document.getElementById('btn').onclick = () => {
    const k = document.getElementById('key').value.trim();
    const v = document.getElementById('val').value.trim();
    
    if (k) {
        let finalVal;
        try {
            // Parses numbers, booleans, arrays, and objects
            finalVal = JSON.parse(v);
        } catch (e) {
            // Fallback to string if JSON.parse fails
            finalVal = v;
        }
        ymap.set(k, finalVal);
        document.getElementById('key').value = '';
        document.getElementById('val').value = '';
    }
};

// DELETE logic
document.getElementById('del-btn').onclick = () => {
    const k = document.getElementById('delete-key').value.trim();
    if (k && ymap.has(k)) {
        ymap.delete(k);
        document.getElementById('delete-key').value = '';
    } else {
        alert("Key not found");
    }
};