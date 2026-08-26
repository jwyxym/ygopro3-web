const lists = [
    ['Linux-x86_64', [
        'YGOPro3-linux-x86_64.AppImage',
        'YGOPro3-linux-x86_64.deb',
        'YGOPro3-linux-x86_64.rpm',
    ]],
    ['Linux-arm64', [
        'YGOPro3-linux-aarch64.AppImage',
        'YGOPro3-linux-aarch64.deb',
        'YGOPro3-linux-aarch64.rpm',
    ]],
    ['macOS-x86_64', [
        'YGOPro3-macos-x86_64.app.zip',
        'YGOPro3-macos-x86_64.dmg',
    ]],
    ['macOS-arm64', [
        'YGOPro3-macos-aarch64.app.zip',
        'YGOPro3-macos-aarch64.dmg',
    ]],
    ['Windows-x86_64', [
        'YGOPro3-windows-x86_64.exe',
        'YGOPro3-windows-x86_64.msi',
    ]],
    ['Windows-arm64', [
        'YGOPro3-windows-aarch64.exe',
        'YGOPro3-windows-aarch64.msi',
    ]],
    ['Android', ['YGOPro3.apk']],
]

const getFileName = (entry) => entry.split('/').pop()

const getDownloadUrl = (entry) => `https://s3-1.nexusmc.cn/ygopro3/${entry}`

const container = document.getElementById('download-list')

for (const [platform, files] of lists) {
    const card = document.createElement('section')
    card.className = 'platform-card'

    const title = document.createElement('h2')
    title.innerText = platform
    card.appendChild(title)

    const filesList = document.createElement('ul')
    for (const entry of files) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = getDownloadUrl(entry)
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
        a.innerText = `YGOPro3.${getFileName(entry).split('.')[1]}`
        li.appendChild(a)
        filesList.appendChild(li)
    }
    card.appendChild(filesList)

    const hint = document.createElement('span')
    hint.className = 'platform-badge'
    hint.textContent = `${files.length} 个文件`
    card.appendChild(hint)

    container.appendChild(card)
}

fetch('https://s3-1.nexusmc.cn/ygopro3/version.txt')
    .catch(e => console.error(e))
    .then(i => i.text())
    .then(i => {
        const span = document.createElement('span');
        span.innerText = `上次更新时间：${i.split('//')[1]}`;
        document.getElementsByClassName('title')[0]
            .appendChild(span);
    })