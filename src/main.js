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
                <div class="pc-close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                <div class="mobile-close-container">
                    <div class="mobile-close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.pc-close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            localStorage.setItem('sites', JSON.stringify(hashMap))
            render()
        })
        $li.on('touchend', '.mobile-close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            localStorage.setItem('sites', JSON.stringify(hashMap))
            render()
        })
        $(document).on('touchstart', (e) => {
            $('.mobile-close-container', $li).fadeOut(200)
        })
        $li.on({
            touchstart: function (e) {
                longClick = 0
                timeOutEvent = setTimeout(function () {
                    $('.mobile-close-container', $li).fadeIn(100)
                    longClick = 1
                }, 500)
                e.preventDefault()
            },
            touchmove: function (e) {
                clearTimeout(timeOutEvent)
                timeOutEvent = 0
                e.preventDefault()
            },
            touchend: function (e) {
                clearTimeout(timeOutEvent)
                if (timeOutEvent !== 0 && longClick === 0) {
                    window.open(node.url, '_self')
                }
            }
        })
    })
}

render()

/**
 * 设置添加网站事件
 */

const submit = () => {
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
    $('#add-dialog-container').fadeOut(200)
    render()
    localStorage.setItem('sites', JSON.stringify(hashMap))
    $('#add-button').removeClass('active')
    $('.icon','#add-button').removeClass('active')
}

$('#add-button').click(() => {
    $('#add-dialog-container').fadeIn(200)
    $('#add-button').addClass('active')
    $('.icon','#add-button').addClass('active')
})

$('#dialog-submit').click(() => {
    submit()
})

$('#field-url').keypress((e) => {
    const { key } = e
    if (key === 'Enter') {
        submit()
    }
    e.stopPropagation()
})

$('#dialog-close').click(() => {
    $('#add-dialog-container').fadeOut(200)
    $('input', '.add-dialog').val('')
    $('#add-button').removeClass('active')
    $('.icon','#add-button').removeClass('active')
})

/**
 * 设置快捷键事件
 */

$(document).on('keypress', (e) => {
    const { key } = e
    window.open(hashMap[key - 1].url, '_self')
})

$('input', '.search-form').on('keypress', (e) => {
    e.stopPropagation()
})

$('input', '.add-dialog').on('keypress', (e) => {
    e.stopPropagation()
})

$('#test').click(() => {
    localStorage.clear()
    location.reload()
})

$('input', '.search-form').focusin(() => {
    $('.search-form').addClass('active')
})

$('input', '.search-form').focusout(() => {
    $('.search-form').removeClass('active')
})