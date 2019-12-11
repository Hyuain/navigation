const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const sites = JSON.parse(localStorage.getItem('sites'))

const hashMap = sites || [
    {
        logo: 'A',
        logoType: 'text',
        name: 'acfun',
        url: 'https://www.acfun.cn'
    }, {
        logo: 'B',
        logoType: 'text',
        name: 'bilibili',
        url: 'https://bilibili.com'
    }
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="name">${node.name}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            localStorage.setItem('sites', JSON.stringify(hashMap))
            render()
        })
    })
}

render()

$(".addButton")
    .on('click', () => {
        $('#addDialogWrapper').css('display', 'block')
    })

$(document).on('keypress', (e) => {
    const { key } = e
    console.log(key)
    window.open(hashMap[key - 1].url, '_self')
})

$('input', '.searchFrom').on('keypress', (e) => {
    e.stopPropagation()
})

$('input', '.addDialog').on('keypress', (e) => {
    e.stopPropagation()
})

$('#dialog-submit', '.addDialog').on('click', (e) => {
    let siteName = $(`input[id='field-name']`, '.addDialog').val()
    let url = $(`input[id='field-url']`, '.addDialog').val()
    $('input', '.addDialog').val('')
    if (!siteName) {
        siteName = simplifyUrl(url)
    }
    if (!url) {
        alert('请务必输入网址哦')
        return
    }
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        name: siteName,
        logo: siteName[0],
        logoType: 'text',
        url: url
    })
    $('#addDialogWrapper').css('display', 'none')
    render()
    localStorage.setItem('sites', JSON.stringify(hashMap))
})

$('#dialog-close', '.addDialog').on('click', () => {
    $('#addDialogWrapper').css('display', 'none')
    $('input', '.addDialog').val('')
    console.log('clicked')
})