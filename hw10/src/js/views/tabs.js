class Tabs {
    constructor() {
        this.tabItems = document.querySelectorAll('.nav-item');
        this.tabContentItems = document.querySelectorAll('.tab-pane');
    }

    delClassActive(tabs) {
        tabs.forEach((tab) => {
            tab.classList.remove('active');
        });
    }
    addClassActive(tabs, atributValue) {
        tabs.forEach((tab) => {
            if (tab.dataset.tab === atributValue) {
                tab.classList.add('active');
            }
        });
    }
    activeTab(atributValue) {
        this.delClassActive(this.tabItems);
        this.delClassActive(this.tabContentItems);
        this.addClassActive(this.tabItems, atributValue);
        this.addClassActive(this.tabContentItems, atributValue);
    }

}

const tabs = new Tabs();
export default tabs;