const $siteList = $('.site-list')
const $lastLi = $siteList.find('li.last')
const sites = JSON.parse(localStorage.getItem('sites'))

/**
 * 设置数据存储及初始化
 */

const hashMap = sites || [
    {
        name: 'Acfun',
        logo: 'A',
        url: 'https://www.acfun.cn',
        ico: 'https://www.acfun.cn/favicon.ico'
    }, {
        logo: 'B',
        name: 'Bilibili',
        url: 'https://bilibili.com',
        ico: 'https://bilibili.com/favicon.ico'
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
                <div class="logo"><img src="${node.ico}"></div>
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
        $li.find('img').on('error', () => {
            $li.find('img').css('display', 'none')
            $li.find('.logo').html(`${node.logo}`)
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
    let ico = simplifyUrl(url)
    $('input', '.add-dialog').val('')
    if (!siteName) {
        siteName = simplifyUrl(url)
    }
    if (!url) {
        alert('请务必输入网址哦')
        return
    }
    if (ico.indexOf('http') !== 0) {
        ico = 'https://' + ico
    }
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        name: siteName,
        logo: siteName[0].toUpperCase(),
        url: url,
        ico: ico + '/favicon.ico'
    })
    $('#add-dialog-container').fadeOut(200)
    render()
    localStorage.setItem('sites', JSON.stringify(hashMap))
    $('#add-button').removeClass('active')
    $('.icon', '#add-button').removeClass('active')
}

$('#add-button').click(() => {
    $('#add-dialog-container').fadeIn(200)
    $('#add-button').addClass('active')
    $('.icon', '#add-button').addClass('active')
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
    $('.icon', '#add-button').removeClass('active')
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

let backgroundIndex = 1

$('.change-background', '.about').click(() => {
    $('body').removeClass(`img${backgroundIndex}`)
    if (backgroundIndex === 10) backgroundIndex = 0
    backgroundIndex++
    $('body').addClass(`img${backgroundIndex}`)
})