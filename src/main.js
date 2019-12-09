const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const sites = JSON.parse(localStorage.getItem('sites'))

const hashMap = sites || [
    {
        logo: 'A',
        logoType: 'text',
        url: 'https://www.acfun.cn'
    }, {
        logo: 'B',
        logoType: 'text',
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
                <div class="link">${simplifyUrl(node.url)}</div>
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
        let url = window.prompt('请问你要添加的网址是？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0],
            logoType: 'text',
            url: url
        })
        render()
        localStorage.setItem('sites', JSON.stringify(hashMap))
    })

$(document).on('keypress', (e) => {
    const { key } = e
    console.log(key)
    window.open(hashMap[key - 1].url, '_self')
})
$('input', '.searchFrom').on('keypress', (e) => {
    e.stopPropagation()
})