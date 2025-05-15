import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare const luxy: any;
declare const $: any;
declare const Webflow: any[];

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private timerSlide: any;
  private isMobile: boolean = /iPhone|iPad|Android/i.test(navigator.userAgent);

  constructor(private router: Router) {}

  initializeLuxy() {
    if (!this.isMobile && typeof luxy !== 'undefined') {
      luxy.init({
        wrapper: '#luxy',
        wrapperSpeed: 0.1,
      });
    }
  }

  setupLinkClickHandlers() {
    const selectors = [
      'a.menu-link', 'a.menu-link-2', 'a.menu-link-3', 'a.menu-link-4',
      'a.menu-link-5', 'a.menu-link-6', 'a.menu-link-7', 'a.button-slider',
      'a.footer-image-container', 'a.artcile-thumb', 'a.next-image-button',
      'a.secondary-nav-button', 'a.logo-btn', 'a.button-slider-landing'
    ].join(',');

    $(selectors).click((e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const goTo = target.getAttribute('href');
      
      if (goTo) {
        setTimeout(() => {
          this.router.navigateByUrl(goTo);
        }, 1200);
      }
    });
  }

  handlePageShow(event: PageTransitionEvent) {
    if (event.persisted) {
      window.location.reload();
    }
  }

  setupSliderFunctionality() {
    const debounce = (func: Function, wait: number, immediate: boolean) => {
      let timeout: any;
      return function (this: any) {
        const context = this;
        const args = arguments;
        const later = () => {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    const onScroll = debounce((direction: boolean) => {
      if (typeof Webflow !== 'undefined') {
        Webflow.push(() => {});
      }
      
      if (direction) {
        $("#w-slider-arrow-left").trigger('tap');
      } else {
        $("#w-slider-arrow-right").trigger('tap');
      }
    }, 200, true);

    $('#slider').on('wheel mousewheel', function(e: any) {
      e.preventDefault();
      const delta = e.originalEvent?.wheelDelta || -1 * e.originalEvent?.deltaY;
      onScroll(delta >= 0);
    });

    const openNextHomeSlider = () => {
      $("#w-slider-arrow-right").trigger('tap');
    };

    this.activateAutoplay = () => {
      this.stopAutoplay();
      this.timerSlide = setTimeout(openNextHomeSlider, 6000);
    };

    this.stopAutoplay = () => {
      if (this.timerSlide) {
        clearTimeout(this.timerSlide);
      }
    };

    $("#w-slider-arrow-right, #w-slider-arrow-left").on('tap', this.activateAutoplay);
    this.activateAutoplay();
  }
}