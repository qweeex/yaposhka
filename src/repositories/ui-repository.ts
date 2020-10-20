import {Route} from "vue-router";

class UIRepository {
    public static PathRouteHistory: Route[] = []
    public static CurrentToolBar: any = undefined
    public static CurrentMainMenu: any = undefined
    public static HasOpenMainMenu = false
    public static SlideItemsCount = 0

    private static HasClickedBackURL: boolean = false

    // Была нажата любая кнопка котораяменяет состояние MainMenu
    public static OnMainMenuToggle(): void {
        UIRepository.HasOpenMainMenu = (UIRepository.HasOpenMainMenu === false)
        if (UIRepository.CurrentMainMenu !== undefined) {
            UIRepository.CurrentMainMenu.$forceUpdate()
        }
    }

    // Событие вызываемое - когда какая либо страница загрузилась и отрисовалась
    public static OnMountedPage(): void {
        if (this.HasOpenMainMenu === true) {
            this.OnMainMenuToggle()
        }
    }

    // Событие вызываемое - когда колличество слайдов на главой изменило свое колличество
    // По факту: просто нужно было после завершения создания всех слайдов - обновлять страницу, а каждый слайд пинает это дейсвие.
    public static OnChangeSlideCount(): void {
        UIRepository.SlideItemsCount = document.querySelectorAll('.slide-item').length;
        (window as any).vue.$children[0].$children[0].$forceUpdate()
    }

    // Была изменена какая либо информация в DataRepository
    public static OnChangedData(): void {
        const updateComponent = (component: Vue) => {
            for (const childComponent of component.$children) {
                updateComponent(childComponent)
            }
            component.$forceUpdate()
        }
        if ((window as any).vue !== undefined) {
            updateComponent((window as any).vue)
        }
    }

    // Метод который должен открыть какую либо ссылку в внешнем браузере
    public static DoOpenRemoteLink(url: string): void {
        if ('cordova' in window) {
            (window as any).cordova.InAppBrowser.open(url, '_blank')
        }
    }

    public static DoBackLocation(): void {
        UIRepository.HasClickedBackURL = true
        if (UIRepository.PathRouteHistory.length === 0) {
            location.hash = '#/home'
            return
        }
        const route: Route | undefined = UIRepository.PathRouteHistory.pop()
        if (route == undefined) {
            location.hash = '#/home'
            return
        }
        location.hash = '#' + route.path
    }

    public static OnLocationChanged(to: Route, from: Route | undefined) {
        if (from !== undefined && from.path !== '/') {
            if (UIRepository.HasClickedBackURL === true) {
                UIRepository.HasClickedBackURL = false
                return
            }
            UIRepository.PathRouteHistory.push(from)
        }
    }
}

export default UIRepository