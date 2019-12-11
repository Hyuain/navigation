const $siteList = $('.site-list')
const $lastLi = $siteList.find('li.last')
const sites = JSON.parse(localStorage.getItem('sites'))

/**
 * 设置数据存储及初始化
 */

const hashMap = sites || [
    {
        logo: 'A',
        logoType: 'text',
        name: 'Acfun',
        url: 'https://www.acfun.cn'
    }, {
        logo: 'B',
        logoType: 'text',
        name: 'Bilibili',
        url: 'https://bilibili.com'
    }
]

/**
 * 设置页面结构
 */

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

/**
 * 设置添加网站事件
 */

$(".add-button")
    .on('click', () => {
        $('#add-dialog-container').css('display', 'block')
    })

$('#dialog-submit', '.add-dialog').
    on('click', () => {
        let siteName = $(`input[id='field-name']`, '.add-dialog').val()
        let url = $(`input[id='field-url']`, '.add-dialog').val()
        $('input', '.add-dialog').val('')
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
        $('#add-dialog-container').css('display', 'none')
        render()
        localStorage.setItem('sites', JSON.stringify(hashMap))
    })

$('#dialog-close', '.add-dialog').
    on('click', () => {
        $('#add-dialog-container').css('display', 'none')
        $('input', '.add-dialog').val('')
    })

/**
 * 设置快捷键事件
 */

$(document).on('keypress', (e) => {
    const { key } = e
    console.log(key)
    window.open(hashMap[key - 1].url, '_self')
})

$('input', '.search-from').on('keypress', (e) => {
    e.stopPropagation()
})

$('input', '.add-dialog').on('keypress', (e) => {
    e.stopPropagation()
})